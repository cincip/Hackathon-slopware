"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/client"; // Import Supabase client creator

// Define type for topic data
type TopicData = {
  name: string;
  description: string;
} | null;


export default function ClassicalMechanicsPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Keep for animation logic if needed
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient(); // Initialize Supabase client
  const topicSlug = 'classical-mechanics'; // Define the slug

  useEffect(() => {
    const fetchTopicData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from('topics')
          .select('name, description')
          .eq('slug', topicSlug)
          .single();

        if (dbError) {
          // Handle case where topic might not be found gracefully if needed
          if (dbError.code === 'PGRST116') { // code for no rows found
             setError(`Topic with slug '${topicSlug}' not found.`);
             setTopicData(null); // Ensure data is null if not found
          } else {
            throw dbError;
          }
        } else if (data) {
          setTopicData(data);
        } else {
           // This case might be redundant if PGRST116 is handled, but good for safety
           setError(`Topic with slug '${topicSlug}' not found.`);
           setTopicData(null);
        }
      } catch (err: any) {
        console.error("Error fetching topic data:", err);
        setError(err.message || "Failed to fetch topic data.");
        setTopicData(null); // Ensure data is null on error
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
    setIsLoaded(true); // Keep or adjust based on animation needs

    // --- Existing Animation Logic ---
    const canvas = canvasRef.current;
    let animationFrameId: number | null = null; // Declare here to be accessible in cleanup

    if (canvas) {
      const ctx = canvas.getContext("2d");
      let ballX = 50;
      let ballY = 150;

      const drawInclinedPlane = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw inclined plane
        ctx.beginPath();
        ctx.moveTo(30, 200);
        ctx.lineTo(300, 250);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#0f172a"; // Use theme colors if available
        ctx.stroke();

        // Draw ball
        ctx.beginPath();
        ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
        ctx.fillStyle = "#3b82f6"; // Use theme colors if available
        ctx.fill();

        // Draw force vector
        ctx.beginPath();
        ctx.moveTo(ballX, ballY);
        ctx.lineTo(ballX + 20, ballY + 15);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ef4444"; // Use theme colors if available
        ctx.stroke();

        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(ballX + 20, ballY + 15);
        ctx.lineTo(ballX + 15, ballY + 5);
        ctx.lineTo(ballX + 25, ballY + 10);
        ctx.lineTo(ballX + 20, ballY + 15);
        ctx.fillStyle = "#ef4444"; // Use theme colors if available
        ctx.fill();

        // Update ball position
        if (ballX < 270) {
          ballX += 0.5;
          ballY += 0.25;
        } else {
          // Reset animation
          ballX = 50;
          ballY = 150;
        }

        animationFrameId = window.requestAnimationFrame(drawInclinedPlane);
      };

      drawInclinedPlane(); // Start animation
    }
    // --- End of Animation Logic ---

    // Cleanup function
    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [topicSlug]); // Add dependencies (supabase client is stable)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // --- Loading State ---
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
        {/* You can replace this with Skeleton components from your UI library */}
        <p>Loading topic details...</p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error loading topic: {error}</p>
        <Link
          href="/topics" // Link back to the main topics page or relevant overview
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Topics
        </Link>
      </div>
    );
  }

  // --- Not Found State (handled within error logic now, but could be separate) ---
   if (!topicData) {
     // This state might be reached if fetchTopicData sets error but not topicData,
     // or if the topic genuinely doesn't exist (handled by PGRST116 check).
     return (
       <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
         <p>Topic not found.</p>
         <Link
           href="/topics" // Link back
           className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
         >
           <ArrowLeft className="mr-1 h-4 w-4" />
           Back to Topics
         </Link>
       </div>
     );
   }

  // --- Success State ---
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/topics" // Adjust if your topics overview page is elsewhere
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Topics
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {/* Use dynamic data */}
        <h1 className="text-3xl font-bold mb-4">{topicData.name}</h1>
        <p className="text-lg text-muted-foreground">
          {topicData.description}
        </p>
      </motion.div>

      {/* Keep the rest of the content (animation, key concepts) */}
      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        {/* Simulation Card */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Simulation: Ball on an Inclined Plane</h2>
              <div className="bg-white rounded-lg p-4 shadow-inner">
                {/* Canvas needs the ref */}
                <canvas ref={canvasRef} width={350} height={300} className="mx-auto"></canvas>
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                A ball rolling down an inclined plane with force vector shown in red
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Concept Card */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Key Concept: Newton's Second Law</h2>
              <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-inner">
                <div className="text-center">
                  <div className="text-4xl font-light mb-4">F = ma</div>
                  <p className="text-muted-foreground">
                    The force acting on an object is equal to the mass of the object multiplied by its acceleration
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
