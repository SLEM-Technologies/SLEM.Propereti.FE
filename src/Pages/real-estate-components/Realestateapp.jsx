import React, { useState } from 'react';
import MapViewPage from './MapViewPage';
import GridViewPage from './GridViewPage';
import PropertyDetailPage from './PropertyDetailPage';

const RealEstateApp = () => {
  const [currentView, setCurrentView] = useState('map'); // 'map', 'grid', 'detail'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isMapView, setIsMapView] = useState(true);

  const handleViewToggle = () => {
    const newMapView = !isMapView;
    setIsMapView(newMapView);
    setCurrentView(newMapView ? 'map' : 'grid');
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView(isMapView ? 'map' : 'grid');
    setSelectedProperty(null);
  };

  if (currentView === 'detail') {
    return (
      <PropertyDetailPage 
        property={selectedProperty}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'grid') {
    return (
      <GridViewPage 
        isMapView={isMapView}
        onViewToggle={handleViewToggle}
        onPropertySelect={handlePropertySelect}
      />
    );
  }

  return (
    <MapViewPage 
      isMapView={isMapView}
      onViewToggle={handleViewToggle}
      onPropertySelect={handlePropertySelect}
    />
  );
};

export default RealEstateApp;

