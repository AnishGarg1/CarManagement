const Cars = require("../models/Cars");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCar = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, tags } = req.body;
    const images = req.files; // Images are in req.files

    if (!userId || !title || !description || !tags) {
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

// update Car
exports.updateCar = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId, title, description, tags, existingImages } = req.body; // `existingImages` is an array of URLs for images to retain
    // Retrieve images from req.files
    const newImages = req.files; // New images are in req.files

    // Convert `newImages` to an array if it exists
    const imagesArray = newImages ? Object.values(newImages) : [];

    // Check if carId is provided and whether any data is present to update
    if (!carId || !(title || description || tags || (imagesArray && imagesArray.length !== 0))) {
      return res.status(400).json({
        success: false,
        message: "No valid data to update. Please provide title, description, tags, or images.",
      });
    }

    // Find car by both carId and userId for ownership verification
    const car = await Cars.findOne({ _id: carId, user: userId });
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found or not authorized to update",
      });
    }

    // Update fields if provided
    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags;

    // Handle image updates
    let updatedImages = existingImages || []; // Start with the existing images the user wants to retain

    // Upload new images to Cloudinary
    if (imagesArray && imagesArray.length > 0) {
        for (const image of imagesArray) {
        const result = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        updatedImages.push(result.secure_url); // Add new image URL to `updatedImages`
      }
    }

    // Remove images from Cloudinary if they are no longer in `updatedImages`
    // const imagesToDelete = car.images.filter(img => !updatedImages.includes(img));
    // for (const img of imagesToDelete) {
    //   await deleteImageFromCloudinary(img); // Delete from Cloudinary (assuming you have a function for this)
    // }

    // Update car images with the new list (including both retained and newly uploaded images)
    car.images = updatedImages;

    // Save updated car details
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
      car,
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
