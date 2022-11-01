package edu.ufl.gatorrush.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class ProblemTests {

    @Test
    void testGetResult() {
        for (int left = 0; left < 100; left++) {
            for (int right = 0; right < 100; right++) {
                Assertions.assertEquals(new Problem(left, '+', right).getResult(), left + right);
                Assertions.assertEquals(new Problem(left, '-', right).getResult(), left - right);
                Assertions.assertEquals(new Problem(left, '*', right).getResult(), left * right);
                if (right > 0) {
                    Assertions.assertEquals(new Problem(left, '/', right).getResult(), left / right);
                }
            }
        }
    }

    @Test
    void testSetInvalidOperator() {
        Problem problem = new Problem(1, '+', 1);
        problem.setOperator('?');
        Assertions.assertEquals(problem.getOperator(), '+');
    }
}
