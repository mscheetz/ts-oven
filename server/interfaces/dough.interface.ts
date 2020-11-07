/**
 * Copyright (c) 2020
 * 
 * Dough interface represents a Dough object
 * 
 * @summary IDough
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-07
 */
import { Datastore } from "./enums";

export interface IDough {
    name: string;
    options: Datastore;
}