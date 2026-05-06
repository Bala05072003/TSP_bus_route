package com.smartbus.routing.dto;

import com.smartbus.routing.model.Point;
import java.util.List;

public class OptimizationResponse {
    private List<Point> path;
    private double totalDistance;
    private double estimatedTime;
    private String algorithmUsed;

    public OptimizationResponse() {}

    public OptimizationResponse(List<Point> path, double totalDistance, double estimatedTime, String algorithmUsed) {
        this.path = path;
        this.totalDistance = totalDistance;
        this.estimatedTime = estimatedTime;
        this.algorithmUsed = algorithmUsed;
    }

    // Static factory to mimic builder if needed
    public static OptimizationResponseBuilder builder() {
        return new OptimizationResponseBuilder();
    }

    public List<Point> getPath() { return path; }
    public void setPath(List<Point> path) { this.path = path; }
    public double getTotalDistance() { return totalDistance; }
    public void setTotalDistance(double totalDistance) { this.totalDistance = totalDistance; }
    public double getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(double estimatedTime) { this.estimatedTime = estimatedTime; }
    public String getAlgorithmUsed() { return algorithmUsed; }
    public void setAlgorithmUsed(String algorithmUsed) { this.algorithmUsed = algorithmUsed; }

    public static class OptimizationResponseBuilder {
        private List<Point> path;
        private double totalDistance;
        private double estimatedTime;
        private String algorithmUsed;

        public OptimizationResponseBuilder path(List<Point> path) { this.path = path; return this; }
        public OptimizationResponseBuilder totalDistance(double totalDistance) { this.totalDistance = totalDistance; return this; }
        public OptimizationResponseBuilder estimatedTime(double estimatedTime) { this.estimatedTime = estimatedTime; return this; }
        public OptimizationResponseBuilder algorithmUsed(String algorithmUsed) { this.algorithmUsed = algorithmUsed; return this; }
        public OptimizationResponse build() {
            return new OptimizationResponse(path, totalDistance, estimatedTime, algorithmUsed);
        }
    }
}
