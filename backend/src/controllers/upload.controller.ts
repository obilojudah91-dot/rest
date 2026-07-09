import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { AppError } from '../middleware/errorHandler';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file as Express.Multer.File;
    if (!file) throw new AppError('No file uploaded', 400);

    const result = await cloudinary.uploader.upload(file.path);
    res.json({ success: true, data: { url: result.secure_url, publicId: result.public_id } });
  } catch (error) { next(error); }
};

export const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const images = files.images || [];

    const uploadPromises = images.map(file => cloudinary.uploader.upload(file.path));
    const results = await Promise.all(uploadPromises);

    const urls = results.map(r => ({ url: r.secure_url, publicId: r.public_id }));
    res.json({ success: true, data: { images: urls } });
  } catch (error) { next(error); }
};
