"use client"
import Features from '@/components/LandingPage/Features'
import Footer from '@/components/LandingPage/Footer'
import Header from '@/components/LandingPage/Header'
import Hero from '@/components/LandingPage/Hero'
import React from 'react'

export default function InitialPage() {
  return (
    <>
      <Hero />
      <Features />
      <Footer />
    </>
  )
}