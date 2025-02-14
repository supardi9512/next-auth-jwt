import { SignupFormSchema, FormState } from '@/app/login/validate'
import { useRouter } from '../../../node_modules/next/navigation';
 
export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...

  // 2. Prepare data for insertion into database
  const { username, password } = validatedFields.data

    const router = useRouter();

    const response = await fetch('http://localhost:8000/api/login', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username,
            password
        })
    });

    console.log(response)

    const content = await response.json();

    if(content.code == 200) {
        await router.push('/');
    } else {

    }
}