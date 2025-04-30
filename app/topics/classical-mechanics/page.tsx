"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import topics from '../../../lib/topic-data.json';
import { CollisionAnimation } from "@/components/svg-animations/collision";


type TopicData = {
  name: string;
  description: string;
} | null;


export default function ClassicalMechanicsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [topicData, setTopicData] = useState<TopicData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topicSlug = 'classical-mechanics';

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundTopic = topics.find(topic => topic.slug === topicSlug);

    if (foundTopic) {
      setTopicData(foundTopic);
    } else {
      setError(`Topic with slug '${topicSlug}' not found in local data.`);
      setTopicData(null);
    }
    setLoading(false);
    setIsLoaded(true);

    return () => {};
  }, [topicSlug]);


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


  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
        <p>Loading topic details...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8 text-center text-red-600">
        <p>Error loading topic: {error}</p>
        <Link
          href="/topics"
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Topics
        </Link>
      </div>
    );
  }


   if (!topicData) {
     return (
       <div className="container max-w-4xl mx-auto px-4 py-8 text-center">
         <p>Topic not found.</p>
         <Link
           href="/topics"
           className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
         >
           <ArrowLeft className="mr-1 h-4 w-4" />
           Back to Topics
         </Link>
       </div>
     );
   }


 return (
   <div className="container max-w-4xl mx-auto px-4 py-8">
     <Link
       href="/topics"
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
        <h1 className="text-3xl font-bold mb-4">{topicData.name}</h1>
        <p className="text-lg text-muted-foreground">
          {topicData.description}
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate={isLoaded ? "show" : "hidden"} className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">Simulation: Elastic Collision</h2>
              <div className="w-full my-4">
                <CollisionAnimation />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Elastic collision between two balls demonstrating conservation of momentum.
              </p>
            </CardContent>
          </Card>
        </motion.div>

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
