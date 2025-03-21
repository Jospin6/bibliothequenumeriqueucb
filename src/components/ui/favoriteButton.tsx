"use client";

import { useEffect } from "react";
import { addFavorite, fetchFavorites } from "@/redux/favories/favoritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Heart } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FavoriteBook } from "@/redux/book/bookSlice";

interface FavoriteButtonProps {
    favorite: FavoriteBook[];
    bookId: number;
}

export default function FavoriteButton({ favorite, bookId }: FavoriteButtonProps) {
    const dispatch = useDispatch<AppDispatch>();
    const favorites = useSelector((state: RootState) => state.favorites.books);
    const user = useCurrentUser()
    const isFavorite = user?.id ? favorite.some(fav => fav.userId === user.id) : false;
    useEffect(() => {
    }, [dispatch]);

    const toggleFavorite = () => {
        if (user) {
            dispatch(addFavorite({ bookId: bookId.toString(), userId: user.id!.toString() }));
        }
    };

    return (
        <>
            {isFavorite || favorites ? (
                <Heart size={15} fill="currentColor" onClick={toggleFavorite} className={`mr-[5px] cursor-pointer text-red-500`} />
            ) : (
                <Heart size={15} onClick={toggleFavorite} className={`mr-[5px] cursor-pointer`} />
            )}
        </>
    );
}
