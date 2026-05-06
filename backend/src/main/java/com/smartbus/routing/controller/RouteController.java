package com.smartbus.routing.controller;

import com.smartbus.routing.dto.OptimizationRequest;
import com.smartbus.routing.dto.OptimizationResponse;
import com.smartbus.routing.service.TSPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*") // For demo purposes
public class RouteController {
    
    @Autowired
    private TSPService tspService;
    
    @PostMapping("/optimize")
    public OptimizationResponse optimize(@RequestBody OptimizationRequest request) {
        return tspService.optimize(request);
    }
}
