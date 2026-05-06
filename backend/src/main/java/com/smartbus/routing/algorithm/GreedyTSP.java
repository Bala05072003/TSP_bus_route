package com.smartbus.routing.algorithm;

import com.smartbus.routing.model.Point;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component("GREEDY")
public class GreedyTSP implements TSPAlgorithm {
    @Override
    public List<Point> solve(Point start, List<Point> points) {
        List<Point> remaining = new ArrayList<>(points);
        List<Point> path = new ArrayList<>();
        path.add(start);
        
        Point current = start;
        while (!remaining.isEmpty()) {
            Point nearest = null;
            double minDist = Double.MAX_VALUE;
            
            for (Point p : remaining) {
                double dist = calculateDistance(current, p);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = p;
                }
            }
            
            path.add(nearest);
            remaining.remove(nearest);
            current = nearest;
        }
        
        path.add(start); // Return to school
        return path;
    }
}
