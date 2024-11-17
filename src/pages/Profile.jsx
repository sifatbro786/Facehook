import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        setLoading(true);

        const fetchProfile = async () => {
            try {
                const res = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
                );
                setUser(res?.data?.user);
                setPosts(res?.data?.posts);
            } catch (err) {
                console.log(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [api ,auth?.user?.id]);

    if (loading) return <div>fetching your profile data</div>;
    if (error) return <div>An error occured!</div>;

    return (
        <div>
            Welcome, {user?.firstName} {user?.lastName}
            <p>You have {posts.length} posts.</p>
        </div>
    );
}
