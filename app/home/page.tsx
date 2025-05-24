import React from 'react'
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className=" flex-1 space-y-8 bg-pink-50 dark:bg-gray-900">
          <Navbar/>
          <ProductCard
           image="/images/menscup.png"
           title="Menstrual Cup - Medium Size"
           description="Medical-grade silicone menstrual cup that offers up to 12 hours of protection. Reusable, eco-friendly, and cost-effective"
           price={4500}
          />
          <ProductCard
           image="/images/organicPad.png"
           title="Eco-friendly Organic Pads"
           description="100% organic cotton pads that are biodegradable and free from plastics, perfumes, and chemicals. Comfortable and perfect for daily use, sensitive skin, and an eco-conscious lifestyle."
           price={999}
          />
          <ProductCard
           image="/images/periodPanty.png"
           title="Period Panties - Hipster Style"
           description="Absorbent, leak-proof underwear that replaces disposable pads and tampons. Can hold up to 2 tampons worth of flow. Washable, reusable, and designed for comfort and confidence all day long."
           price={5200}
          />
        </div>
  )
}
