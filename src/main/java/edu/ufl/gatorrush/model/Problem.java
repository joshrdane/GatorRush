package edu.ufl.gatorrush.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Random;

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

    protected Problem() {}

    public Problem(int leftOperand, char operator, int rightOperand) {
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
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
        return getResult(leftOperand, operator, rightOperand);
    }

    private static Integer getResult(Integer leftOperand, Character operator, Integer rightOperand) {
        return switch (operator) {
            case '+' -> leftOperand + rightOperand;
            case '-' -> leftOperand - rightOperand;
            case '*' -> leftOperand * rightOperand;
            case '/' -> leftOperand / rightOperand;
            default -> throw new IllegalStateException("Unexpected value: " + operator);
        };
    }

    public Integer[] getOptions() {
        Random random = new Random();
        boolean flipFlop = random.nextBoolean();
        Integer[] result = new Integer[] {
                getResult(leftOperand + 1, operator, rightOperand),
                getResult(leftOperand, operator, rightOperand + 1),
                getResult(leftOperand, switch (operator) {
                    default -> operator;
                    case '+', '/' -> '-';
                    case '-', '*' -> '+';
                }, rightOperand),
                getResult(leftOperand + (flipFlop ? 1 : 0), switch (operator) {
                    default -> operator;
                    case '+', '/' -> '-';
                    case '-', '*' -> '+';
                }, rightOperand + (flipFlop ? 0 : 1))
        };
        // Custom shuffle
        for (int i = 0; i < result.length; i++) {
            for (int j = 0; j < result.length; j++) {
                if (i != j && random.nextBoolean()) {
                    Integer temp = result[i];
                    result[i] = result[j];
                    result[j] = temp;
                }
            }
        }
        // Inject the correct answer into a random spot within the results array
        result[(int)(random.nextDouble() * result.length)] = getResult();
        return result;
    }

    public void setOperator(Character operator) {
        if (operator == '+' || operator == '-' || operator == '*' || operator == '/') {
            this.operator = operator;
        }
    }
}
