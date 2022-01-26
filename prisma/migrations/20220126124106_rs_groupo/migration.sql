/*
  Warnings:

  - Added the required column `content` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `content` VARCHAR(1200) NOT NULL,
    MODIFY `image_url` VARCHAR(510) NULL;
