/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.edu.utp.lb.model;

/**
 *
 * @author Artur Mokosa
 */
public interface Event {

    public enum Type {
        INFO,
        RESTART,
        UPDATE,
        ERROR;
    }
}
