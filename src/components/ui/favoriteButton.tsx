"use client";

import { useEffect } from "react";
import { addFavorite, fetchFavorites } from "@/redux/favories/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Heart } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function FavoriteButton({ bookId }: { bookId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites.books);
    const isFavorite = favorites.includes(bookId);
    const user = useCurrentUser()

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    const toggleFavorite = () => {
        if (user) {
            dispatch(addFavorite({bookId: bookId, userId: user.id!.toString()}));   
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={`px-4 py-2 rounded-lg ${isFavorite ? "bg-red-500" : "bg-gray-300"}`}
        >
            {isFavorite ? (<Heart size={15} className="mr-[5px]"/>) : <Heart size={15} className="mr-[5px]"/>}
        </button>
    );
}
