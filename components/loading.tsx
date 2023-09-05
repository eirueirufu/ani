"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export default function Loading({ className }: React.HTMLAttributes<"div">) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className='flex gap-1'>
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, delay: 0 }}
          className='w-3 h-3 dark:bg-white bg-black rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, delay: 0.2 }}
          className='w-3 h-3 dark:bg-white bg-black rounded-full'
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, delay: 0.4 }}
          className='w-3 h-3 dark:bg-white bg-black rounded-full'
        />
      </div>
    </div>
  );
}
