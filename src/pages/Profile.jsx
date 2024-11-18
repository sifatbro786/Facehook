import { useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

export default function Profile() {
    const { state, dispatch } = useProfile();

    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        const fetchProfile = async () => {
            try {
                const res = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`,
                );

                if (res.status === 200) {
                    dispatch({ type: actions.profile.DATA_FETCHED, data: res.data });
                }
            } catch (err) {
                console.log(err);
                dispatch({ type: actions.profile.DATA_FETCH_ERROR, error: err.message });
            }
        };

        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth?.user?.id]);

    if (state?.loading) return <div>fetching your profile data</div>;
    if (state?.error) return <div>An error occured!</div>;

    return (
        <>
            <ProfileInfo />
            <MyPosts />
        </>
    );
}
