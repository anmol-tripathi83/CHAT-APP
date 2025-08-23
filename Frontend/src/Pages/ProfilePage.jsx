import { useAuthStore } from "../store/useAuthStore";


export const ProfilePage = () => {
    const { authUser }  = useAuthStore();
    return (
        <div>ProfilePage</div>
    )
}
