"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Laptop, Users, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Home Page</h1>
            <p className="text-xl mb-8">Welcome to the main Page</p>
            <div className="space-x-4">
              {/* <Button
                asChild
                size="lg"
                variant="secondary"
                className="hover:bg-white hover:text-blue-600"
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            User Dashboard
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-blue-500 mb-4">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Search for Mentors / Mentees
              </h3>
              <p className="text-gray-600">
                Find developers who are in need of help or offering help.
              </p>
            </Card>
            <Card className="p-6">
              <div className="text-blue-500 mb-4">
                <Laptop className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Update your profile
              </h3>
              <p className="text-gray-600">
                Update your skills and experience.
              </p>
            </Card>
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
          </div>
        </div>
      </section>
    </main>
  );
}
