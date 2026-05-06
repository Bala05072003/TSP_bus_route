package com.smartbus.routing.algorithm;

import com.smartbus.routing.model.Point;
import org.springframework.stereotype.Component;
import java.util.*;

@Component("DP")
public class HeldKarpTSP implements TSPAlgorithm {
    
    @Override
    public List<Point> solve(Point start, List<Point> points) {
        int n = points.size() + 1; // including start
        List<Point> allPoints = new ArrayList<>();
        allPoints.add(start);
        allPoints.addAll(points);
        
        double[][] dist = new double[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = calculateDistance(allPoints.get(i), allPoints.get(j));
            }
        }
        
        double[][] memo = new double[n][1 << n];
        int[][] parent = new int[n][1 << n];
        for (double[] row : memo) Arrays.fill(row, -1);
        
        solveDP(0, 1, n, dist, memo, parent);
        
        List<Point> path = new ArrayList<>();
        int curr = 0;
        int mask = 1;
        path.add(allPoints.get(curr));
        
        for (int i = 0; i < n - 1; i++) {
            curr = parent[curr][mask];
            mask |= (1 << curr);
            path.add(allPoints.get(curr));
        }
        
        path.add(start); // Return to school
        return path;
    }
    
    private double solveDP(int curr, int mask, int n, double[][] dist, double[][] memo, int[][] parent) {
        if (mask == (1 << n) - 1) {
            return dist[curr][0];
        }
        
        if (memo[curr][mask] != -1) return memo[curr][mask];
        
        double res = Double.MAX_VALUE;
        int bestNext = -1;
        
        for (int next = 0; next < n; next++) {
            if ((mask & (1 << next)) == 0) {
                double newDist = dist[curr][next] + solveDP(next, mask | (1 << next), n, dist, memo, parent);
                if (newDist < res) {
                    res = newDist;
                    bestNext = next;
                }
            }
        }
        
        parent[curr][mask] = bestNext;
        return memo[curr][mask] = res;
    }
}
