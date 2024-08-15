"use client";

import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type ImageUploadProps<T extends FieldValues> = UseControllerProps<T>;

export const ImageUpload = <T extends FieldValues>({
  control,
  name,
}: ImageUploadProps<T>) => {
  const { field } = useController({
    name,
    control,
  });
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
      field.onChange(e); // Ensure the field value is updated
    }
  };
  return (
    <div className={styles.field}>
      <label>プロフィール画像</label>
      <input type="file" {...field} onChange={handleImageChange} />
      {profileImage && (
        <Image
          src={profileImage}
          alt="Profile Image"
          width={100}
          height={100}
        />
      )}
    </div>
  );
};
