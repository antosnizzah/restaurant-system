import "dotenv/config";
import { Context } from "hono";
import { createAuthorizeUsersService ,userLoginService} from "./auth.service";
import { updateAuthorizeUsersService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";

export const createAuthorizeUsersController = async (c: Context) => {
    try{
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword=await bycrpt.hash(pass, 10);
        user.password=hashedPassword;
        const createdUser = await createAuthorizeUsersService(user);

        if (!createdUser) return c.text("User not created", 404);
        return c.json({ message: createdUser }, 201);

    }catch (err:any) {
        return c.json({ error: err?.message }, 400);
    }
}

// export const updateAuthorizeUsersController = async (c: Context) => {
//     try {
//         const id = parseInt(c.req.param("id"));
//         if (isNaN(id)) {
//             return c.text("Invalid id", 400);
//         }
        
//         const user = await c.req.json();
//         if (!user.password) {
//             return c.text("Password is required", 400);
//         }
        
//         const hashedPassword = await bycrpt.hash(user.password, 10);
//         user.password = hashedPassword;

//         const updatedUser = await updateAuthorizeUsersService(id, user);
//         if (!updatedUser) {
//             return c.text("User not updated", 404);
//         }
//         return c.json({ message: updatedUser }, 200);
//     } catch (error: any) {
//         console.error('Controller error:', error);
//         return c.json({ error: error?.message }, 500);
//     }
// }

export const UserLoginController = async (c: Context) => {
    try {
        const user = await c.req.json();
        console.log('Received user:', user);

        const userExist: any = await userLoginService(user);
        console.log('User found:', userExist);

        if (userExist === null) {
            return c.json({ error: "User not found" }, 404);
        }

        const userMatch = await bycrpt.compare(user.password, userExist?.password as string);
        console.log('Password match:', userMatch);

        if (!userMatch) {
            return c.json({ error: "Password not match" }, 401);
        } else {
            const payload = {
                name: userExist.username,
                role: userExist?.role,
                expire: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
            };

            const secret = process.env.JWT_SECRET;
            console.log('JWT secret:', secret);

            if (!secret) {
                throw new Error('JWT_SECRET is not defined');
            }

            // Generate the token using @hono/jwt and await the promise
            const token = await sign(payload, secret);
            console.log('Generated token:', token);

            if (!token) {
                throw new Error('Token generation failed');
            }

            const user = userExist?.user;
            const role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);
        }
    } catch (error: any) {
        console.error('Error:', error);
        return c.json({ error: error?.message }, 400);
    }
};