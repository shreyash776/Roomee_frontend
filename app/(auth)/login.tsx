import { useRouter } from 'expo-router';
import LoginScreen from '../screens/Auth/LoginScreen';

export default function LoginRoute() {
  const router = useRouter();

  const handleAuth = () => {
    // Add your authentication logic here
    // For example:
    // await authenticate(email, password);
    
    // Navigate back to profile or home after login
    router.replace('/(tabs)/profile');
  };

  return <LoginScreen onAuth={handleAuth} />;
}
