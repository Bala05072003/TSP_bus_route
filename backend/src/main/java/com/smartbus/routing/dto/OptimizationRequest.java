package com.smartbus.routing.dto;

import com.smartbus.routing.model.Point;
import java.util.List;

public class OptimizationRequest {
    private Point school;
    private List<Point> houses;
    private String algorithm;

    public OptimizationRequest() {}

    public Point getSchool() { return school; }
    public void setSchool(Point school) { this.school = school; }
    public List<Point> getHouses() { return houses; }
    public void setHouses(List<Point> houses) { this.houses = houses; }
    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }
}
