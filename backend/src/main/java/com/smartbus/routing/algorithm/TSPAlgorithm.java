package com.smartbus.routing.algorithm;

import com.smartbus.routing.model.Point;
import java.util.List;

public interface TSPAlgorithm {
    List<Point> solve(Point start, List<Point> points);
    
    default double calculateDistance(Point p1, Point p2) {
        // Haversine formula or simple Euclidean for demo purposes
        // Using Euclidean for simplicity in demo coordinates
        double latDiff = p1.getLat() - p2.getLat();
        double lngDiff = p1.getLng() - p2.getLng();
        return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // Approx km
    }
}
