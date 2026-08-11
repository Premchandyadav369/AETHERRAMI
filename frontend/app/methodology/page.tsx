'use client';

import React from 'react';
import RootLayout from '../layout';
import MethodologyStudio from '../components/MethodologyStudio';

export default function MethodologyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      <MethodologyStudio />
    </div>
  );
}
