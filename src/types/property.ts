export interface Property {
  // Location Information
  state: string;
  region: string;
  district: string;
  village: string;
  zone: string;
  branch: string;
  
  // Coordinates
  coordinates: string; // Raw coordinates string (e.g., "2.1450379 45.121262 49.47314453125 3.952")
  latitude: number;    // Extracted from coordinates
  longitude: number;   // Extracted from coordinates
  altitude: number;    // Extracted from coordinates
  precision: number;   // Extracted from coordinates
  
  // Property Identification
  code: string;
  street_name: string;
  property_type: 'Residential' | 'Commercial' | 'Industrial' | 'Agricultural' | string;
  property_status: 'Occupied' | 'Vacant' | 'Under Construction' | 'For Rent' | 'For Sale' | string;
  others?: string; // Optional field
  
  // Property Directions
  property_direction_north: string;
  property_direction_south: string;
  property_direction_west: string;
  property_direction_east: string;
  property_direction: string; // Combined directions
  
  // Property Characteristics
  property_size_sm2: number;
  house_building_details: string;
  type_of_villa: string;
  villas: number;
  
  // Address Information
  property_address: string;
  landmark: string;
  
  // Media
  plot_picture: string;
  plot_picture_url: string;
  
  // Occupant Information
  occupant_details: string;
  
  // Owner Information
  owner_name: string;
  owner_gender: 'Male' | 'Female' | 'Other' | string;
  owner_age: number;
  owner_nid: string;
  owner_phone: string;
  owner_email: string;
  owner_address: string;
  owner_income_source: string;
  
  // System Fields
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string; // MongoDB ID
}
