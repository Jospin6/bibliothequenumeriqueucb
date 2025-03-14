"use client"
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUser, fetchcurrentUser} from "@/redux/user/userSlice"

export function useCurrentUser() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchcurrentUser())
  }, [dispatch]);

  return user;
}
