package com.smartbus.routing.algorithm;

import com.smartbus.routing.model.Point;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component("BRUTE")
public class BruteForceTSP implements TSPAlgorithm {
    private double minDistance;
    private List<Point> bestPath;

    @Override
    public List<Point> solve(Point start, List<Point> points) {
        minDistance = Double.MAX_VALUE;
        bestPath = new ArrayList<>();
        
        permute(points, 0, start);
        
        List<Point> result = new ArrayList<>();
        result.add(start);
        result.addAll(bestPath);
        result.add(start);
        return result;
    }

    private void permute(List<Point> points, int k, Point start) {
        for (int i = k; i < points.size(); i++) {
            java.util.Collections.swap(points, i, k);
            permute(points, k + 1, start);
            java.util.Collections.swap(points, k, i);
        }
        if (k == points.size()) {
            double currentDist = calculateTotalDistance(start, points);
            if (currentDist < minDistance) {
                minDistance = currentDist;
                bestPath = new ArrayList<>(points);
            }
        }
    }

    private double calculateTotalDistance(Point start, List<Point> points) {
        if (points == null || points.isEmpty()) return 0;
        double dist = calculateDistance(start, points.get(0));
        for (int i = 0; i < points.size() - 1; i++) {
            dist += calculateDistance(points.get(i), points.get(i+1));
        }
        dist += calculateDistance(points.get(points.size() - 1), start);
        return dist;
    }
}
