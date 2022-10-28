package edu.ufl.gatorrush.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Represents a two operand equation
 */
@Entity
public class Problem {

    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Left Operand
     */
    @Column(nullable = false)
    private Integer leftOperand;

    /**
     * Right Operand
     */
    @Column(nullable = false)
    private Integer rightOperand;

    /**
     * Operator
     */
    @Column(nullable = false)
    private Character operator;

    protected Problem() {
        operator = '+';
    }

    public Long getId() {
        return id;
    }

    public Integer getLeftOperand() {
        return leftOperand;
    }

    public void setLeftOperand(Integer leftOperand) {
        this.leftOperand = leftOperand;
    }

    public Integer getRightOperand() {
        return rightOperand;
    }

    public void setRightOperand(Integer rightOperand) {
        this.rightOperand = rightOperand;
    }

    public char getOperator() {
        return operator;
    }
    
    public Integer getResult() {
        return switch (operator) {
            case '+' -> leftOperand + rightOperand;
            case '-' -> leftOperand - rightOperand;
            case '*' -> leftOperand * rightOperand;
            case '/' -> leftOperand / rightOperand;
            default -> throw new IllegalStateException("Unexpected value: " + operator);
        };
    }

    public Integer[] getOperands() {
        return new Integer[] {leftOperand, rightOperand};
    }

    public void setOperator(Character operator) {
        if (operator == '+' || operator == '-' || operator == '*' || operator == '/') {
            this.operator = operator;
        }
    }
}
