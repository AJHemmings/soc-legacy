"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Laptop, Users, BookOpen } from "lucide-react";
import Link from "next/link";

interface UserData {
  email: string;
  name: string;
  password: string;
  skills: {
    React: number;
    "Node.js": number;
    testing: number;
  };
}

export default function Home() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
    password: "",
    skills: {
      React: 0,
      "Node.js": 0,
      testing: 0,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserData({
          email: data.email || "",
          name: data.name || "",
          password: data.password || "",
          skills: {
            React: data.skills?.React || 0,
            "Node.js": data.skills?.["Node.js"] || 0,
            testing: data.skills?.testing || 0,
          },
        });
        console.table("User data fetched:", data);
        console.log("User data fetched:", userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [name]: Number(value),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated user data:", userData);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/img/school_of_codes_01.png" alt="School of Codes" className="mx-auto mb-8 w-20 bg-white p-1 rounded-lg shadow-lg" />
            <h1 className="text-5xl font-bold mb-6">User profile</h1>
            <p className="text-xl mb-8">Update profile</p>
            <div className="space-x-4"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[50rem]">
          <Link href="/home">
            <Button className="mb-4">Back to Home</Button>
          </Link>
          {/* <h2 className="text-3xl font-bold text-center mb-12">User profile</h2> */}
          <Card className="p-6">
            <div className="text-blue-500 mb-4">
              <Laptop className="w-12 h-12" />
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              </div>
              <div className="w-[10rem]">
                <p className="text-gray-600">
                  Skills:
                </p>
                <div>
                  <label>React:</label>
                  <input
                    type="range"
                    name="React"
                    min="0"
                    max="4"
                    value={userData.skills["React"]}
                    onChange={handleSkillChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label>Node.js:</label>
                  <input
                    type="range"
                    name="Node.js"
                    min="0"
                    max="4"
                    value={userData.skills["Node.js"]}
                    onChange={handleSkillChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label>Testing:</label>
                  <input
                    type="range"
                    name="testing"
                    min="0"
                    max="4"
                    value={userData.skills.testing}
                    onChange={handleSkillChange}
                    className="w-full"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Update Profile
              </Button>
            </form>
            {/* <h3 className="text-xl font-semibold mb-2">
              Update your profile
            </h3>
            <p className="text-gray-600">
              Update your skills and experience.
            </p> */}
          </Card>
          {/* <div className="grid md:grid-cols-3 gap-8">
            <Link href="/mentor">
              <Card className="p-6">
                <div className="text-blue-500 mb-4">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Search for Mentors / Mentees.
                </h3>
                <p className="text-gray-600">
                  Find developers who are in need of help or offering help.
                </p>
              </Card>
            </Link>
            <Card className="p-6">
              <div className="text-blue-500 mb-4">
                <BookOpen className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn and Grow</h3>
              <p className="text-gray-600">
                Access resources, join community projects, and accelerate your
                development career.
              </p>
            </Card>
          </div> */}
        </div>
      </section>
    </main>
  );
}
