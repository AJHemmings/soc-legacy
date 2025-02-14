"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Laptop, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Mentor() {
  const [mentors, setMentors] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: "",
    skills: "",
    level: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editMentor, setEditMentor] = useState(null); // Track which mentor to edit
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch mentors on component mount
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:3001/users");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMentors();
  }, []);

  // Filter mentors based on search query
  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort mentors by skill level
  const sortMentors = (order) => {
    const sortedMentors = [...filteredMentors].sort((a, b) => {
      if (order === "asc") {
        return a.level.localeCompare(b.level);
      } else {
        return b.level.localeCompare(a.level);
      }
    });
    setMentors(sortedMentors);
    setSortOrder(order);
  };

  // Handle adding a new mentor
  const addMentor = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMentor),
    })
      .then((response) => response.json())
      .then((data) => {
        setMentors([...mentors, data]);
        setNewMentor({ name: "", skills: "", level: "" }); // Reset form after adding
      })
      .catch((error) => console.error("Error adding mentor:", error));
  };

  // Handle deleting a mentor
  const deleteMentor = (id) => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedMentors = mentors.filter((mentor) => mentor.id !== id);
        setMentors(updatedMentors);
      })
      .catch((error) => console.error("Error deleting mentor:", error));
  };

  // Handle editing a mentor
  const handleEdit = (mentor) => {
    setEditMentor(mentor); // Set mentor data to edit
  };

  // Handle updating a mentor
  const updateMentor = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users/${editMentor.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMentor),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedMentors = mentors.map((mentor) =>
          mentor.id === data.id ? data : mentor
        );
        setMentors(updatedMentors);
        setEditMentor(null); // Reset editing after update
      })
      .catch((error) => console.error("Error updating mentor:", error));
  };

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear user session, tokens, etc.
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen">
      <Button onClick={handleLogout} className="absolute top-4 left-4">
        Logout
      </Button>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/img/school_of_codes_01.png" alt="School of Codes" className="mx-auto mb-8 w-20 bg-white p-1 rounded-lg shadow-lg" />
            <h1 className="text-5xl font-bold mb-6">Mentors and Mentees</h1>
            <p className="text-xl mb-8">Welcome to the Mentor / Mentee page</p>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link href="/home">
            <Button className="mb-4 mr-20">Back to Home</Button>
          </Link>
          <input
            type="text"
            placeholder="Search mentors by name or skills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <div className="mt-4">
            <button
              onClick={() => sortMentors("asc")}
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Sort by Level Ascending
            </button>
            <button
              onClick={() => sortMentors("desc")}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Sort by Level Descending
            </button>
          </div>
        </div>
      </section>

      {/* Mentor Cards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mentor Dashboard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-gray-100 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                <p className="text-gray-600 mb-2">Skills: {mentor.skills}</p>
                <p className="text-gray-600">Level: {mentor.level}</p>
                <button
                  className="text-red-600 mt-4"
                  onClick={() => deleteMentor(mentor.id)}
                >
                  Delete
                </button>
                <button
                  className="text-blue-600 mt-4 ml-2"
                  onClick={() => handleEdit(mentor)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add New Mentor Form */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Add New Mentor
          </h2>
          <form onSubmit={addMentor} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Name"
              value={newMentor.name}
              onChange={(e) =>
                setNewMentor({ ...newMentor, name: e.target.value })
              }
              className="mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Skills"
              value={newMentor.skills}
              onChange={(e) =>
                setNewMentor({ ...newMentor, skills: e.target.value })
              }
              className="mb-4 p-2 border"
            />
            <input
              type="text"
              placeholder="Level"
              value={newMentor.level}
              onChange={(e) =>
                setNewMentor({ ...newMentor, level: e.target.value })
              }
              className="mb-4 p-2 border"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Add Mentor
            </button>
          </form>
        </div>
      </section>

      {/* Edit Mentor Form (Appears when editing a mentor) */}
      {editMentor && (
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Edit Mentor</h2>
            <form
              onSubmit={updateMentor}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                placeholder="Name"
                value={editMentor.name}
                onChange={(e) =>
                  setEditMentor({ ...editMentor, name: e.target.value })
                }
                className="mb-4 p-2 border"
              />
              <input
                type="text"
                placeholder="Skills"
                value={editMentor.skills}
                onChange={(e) =>
                  setEditMentor({ ...editMentor, skills: e.target.value })
                }
                className="mb-4 p-2 border"
              />
              <input
                type="text"
                placeholder="Level"
                value={editMentor.level}
                onChange={(e) =>
                  setEditMentor({ ...editMentor, level: e.target.value })
                }
                className="mb-4 p-2 border"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Update Mentor
              </button>
              <button
                type="button"
                onClick={() => setEditMentor(null)}
                className="bg-gray-500 text-white p-2 rounded mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
