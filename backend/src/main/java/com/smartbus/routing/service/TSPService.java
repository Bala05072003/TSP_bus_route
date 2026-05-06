package com.smartbus.routing.service;

import com.smartbus.routing.algorithm.TSPAlgorithm;
import com.smartbus.routing.dto.OptimizationRequest;
import com.smartbus.routing.dto.OptimizationResponse;
import com.smartbus.routing.model.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class TSPService {
    @Autowired
    private Map<String, TSPAlgorithm> algorithms;

    public OptimizationResponse optimize(OptimizationRequest request) {
        String algoKey = request.getAlgorithm().toUpperCase();
        TSPAlgorithm algorithm = algorithms.getOrDefault(algoKey, algorithms.get("GREEDY"));
        
        List<Point> path = algorithm.solve(request.getSchool(), request.getHouses());
        
        double totalDistance = calculatePathDistance(path, algorithm);
        double estimatedTime = totalDistance / 30.0 * 60.0; // 30 km/h avg speed, in minutes
        
        return OptimizationResponse.builder()
                .path(path)
                .totalDistance(Math.round(totalDistance * 100.0) / 100.0)
                .estimatedTime(Math.round(estimatedTime * 10.0) / 10.0)
                .algorithmUsed(algoKey)
                .build();
    }
    
    private double calculatePathDistance(List<Point> path, TSPAlgorithm algo) {
        double dist = 0;
        for (int i = 0; i < path.size() - 1; i++) {
            dist += algo.calculateDistance(path.get(i), path.get(i+1));
        }
        return dist;
    }
}
