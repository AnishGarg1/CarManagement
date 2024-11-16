const Cars = require("../models/Cars");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCar = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, tags } = req.body;
    const images = req.files; // Images are in req.files

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Array to hold URLs of uploaded images
    const imageUrls = [];

    if(images){
        // Loop through each file and upload to Cloudinary
        for (const image of images) {
          const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
          imageUrls.push(result.secure_url); // Store the Cloudinary URL
        }
    }

    // Create new car with image URLs
    const car = new Cars({
      user: user._id,
      title,
      description,
      tags,
      images: imageUrls, // Save the Cloudinary URLs
    });

    const createdCar = await car.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { cars: createdCar._id }, // Assuming you want to store created cars in the user model
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      car: createdCar,
      message: "Car created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// updateCar method to handle image uploads without multer
exports.updateCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId, title, description, tags, existingImages } = req.body; // existingImages to retain current images
    // const newImages = req.files; // New images from req.files
    const newImages = req.files['newImages[]']; // Access the array of images

    // Convert `newImages` to an array if it exists
    // const imagesArray = newImages ? Object.values(newImages) : [];
    const imagesArray = newImages;

    // // Validate image file types (optional server-side check for images)
    // for (let i = 0; i < imagesArray.length; i++) {
    //   const image = imagesArray[i];
    //   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    //   if (!allowedTypes.includes(image.mimetype)) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Only image files (JPEG, PNG, JPG, GIF) are allowed.",
    //     });
    //   }
    // }

    // Ensure carId and data are provided
    if (!carId || !(title || description || tags || (imagesArray && imagesArray.length !== 0))) {
      return res.status(400).json({
        success: false,
        message: "No valid data to update. Please provide title, description, tags, or images.",
      });
    }

    // Find car and verify ownership
    const car = await Cars.findOne({ _id: carId, user: userId });
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found or not authorized to update",
      });
    }

    // Update car fields if provided
    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;

    // Handle image updates
    let updatedImages = existingImages || []; // Keep existing images the user wants to retain

    // Upload new images to Cloudinary (handle each image)
    if (imagesArray && imagesArray.length > 0) {
      for (const image of imagesArray) {
        const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME); // Assuming this uploads to Cloudinary
        updatedImages.push(result.secure_url); // Add new image URL to updatedImages
      }
    }

    // Optionally, remove images from Cloudinary if no longer in `updatedImages`
    // const imagesToDelete = car.images.filter(img => !updatedImages.includes(img));
    // for (const img of imagesToDelete) {
    //   await deleteImageFromCloudinary(img); // Function to delete from Cloudinary
    // }

    // Save updated car
    car.images = updatedImages;
    const updatedCar = await car.save();

    return res.status(200).json({
      success: true,
      car: updatedCar,
      message: "Car updated successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Get car details
exports.getCarDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.body;  // Extract carId from the route params

    // Find the car by its ID and check if it belongs to the current user
    const car = await Cars.find({ _id: carId, user: userId}).populate("user").exec();

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Return the car details
    return res.status(200).json({
      success: true,
      car: car[0],
      message: "Car details fetched successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// get user's all cars
exports.getAllCarsDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const allCars = await Cars.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      allCars,
      message: "All cars fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// delete car
exports.deleteCar = async (req, res) => {
  try {
    const { carId } = req.body;
    const userId = req.user.id;

    if (!carId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { cars: carId },
      },
      { new: true }
    );

    await Cars.findByIdAndDelete(carId);

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};
