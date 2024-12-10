"use client";

import { useForm } from "react-hook-form";

import { editProfile } from "./edit-profile-action";


interface FormValues {
  userName: string;
  displayName: string;
}

type User = {
  username: string;
  displayName: string;
};

export async function EditProfileForm( user: User) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { userName: user.username, displayName: user.displayName },
  });


  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        editProfile(data.userName, data.displayName);
      })}
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Username
        <input
          {...register("userName")}
          type="text"
          className="grow"
        />
      </label>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Displayname
        <input {...register("displayName")} type="text" className="grow" />
      </label>
      <input className="btn btn-sm btn-outline" type="submit" value="Save" />
    </form>
  );
}
