package edu.ufl.gatorrush.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Problem {

    @Id
    @GeneratedValue
    private long id;

    private int leftOperand;

    private int rightOperand;

    private char operator;

    protected Problem() {
        operator = '+';
    }

    public long getId() {
        return id;
    }

    public int getLeftOperand() {
        return leftOperand;
    }

    public void setLeftOperand(int leftOperand) {
        this.leftOperand = leftOperand;
    }

    public int getRightOperand() {
        return rightOperand;
    }

    public void setRightOperand(int rightOperand) {
        this.rightOperand = rightOperand;
    }

    public char getOperator() {
        return operator;
    }
    
    public int getResult() {
        return switch (operator) {
            case '+' -> leftOperand + rightOperand;
            case '-' -> leftOperand - rightOperand;
            case '*' -> leftOperand * rightOperand;
            case '/' -> leftOperand / rightOperand;
            default -> throw new IllegalStateException("Unexpected value: " + operator);
        };
    }

    public int[] getOperands() {
        return new int[] {leftOperand, rightOperand};
    }

    public void setOperator(Character operator) {
        if (operator == '+' || operator == '-' || operator == '*' || operator == '/') {
            this.operator = operator;
        }
    }
}
