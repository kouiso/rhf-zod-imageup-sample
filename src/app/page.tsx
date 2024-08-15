"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import styles from "./page.module.scss";
import type { FormData } from "./schema"; // type-only import
import { schema } from "./schema";
import { handleFormSubmission } from "./action";
import { ImageUpload } from "./image-upload";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio);
      if (data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      await handleFormSubmission(formData);
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

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
        <ImageUpload name="profileImage" control={control} />
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
      <Toaster />
    </main>
  );
}
