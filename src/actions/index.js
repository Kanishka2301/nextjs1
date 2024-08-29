"use server";

import connectToDB from "@/database";
import User from "@/models/user";

export async function addNewUserAction(formData) {
  try {
    await connectToDB();

    const newlyCreatedUser = await User.create(formData);
    return {
      success: true,
      message: "User added successfully",
      data: newlyCreatedUser,
    };
  } catch (error) {
    console.error("Error creating new user:", error.message);
    return {
      success: false,
      message: "Some error occurred. Please try again.",
    };
  }
}

export async function fetchUsersAction() {
  await connectToDB();
  try {
    const listOfUsers = await User.find({});
    if (listOfUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(listOfUsers)),
      };
    } else {
      return {
        success: false,
        message: "Some error occurred. Please try again.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Some error occurred. Please try again.",
    };
  }
}
