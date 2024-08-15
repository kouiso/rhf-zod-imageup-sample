"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./page.module.scss";
import { FormData, schema } from "./schema";
import { handleFormSubmission } from "./action";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await handleFormSubmission({
        ...data,
        profileImage: data.profileImage[0],
      });
      toast.success("フォームが正常に送信されました！");
    } catch (error) {
      toast.error("フォームの送信に失敗しました。");
      console.error(error);
    }
  };

  const onError = (errors: FieldValues) => {
    toast.error("フォームの送信に失敗しました。");
    console.error(errors);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
        <div className={styles.field}>
          <label>プロフィール画像</label>
          <input
            type="file"
            {...register("profileImage")}
            onChange={handleImageChange}
          />
          {profileImage && (
            <Image
              src={profileImage}
              alt="Profile Image"
              width={100}
              height={100}
            />
          )}
        </div>
        <div className={styles.field}>
          <label>氏名</label>
          <input type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={styles.field}>
          <label>自己紹介</label>
          <textarea {...register("bio")} />
          {errors.bio && <p>{errors.bio.message}</p>}
        </div>
        <button type="submit">送信</button>
      </form>
    </main>
  );
}
