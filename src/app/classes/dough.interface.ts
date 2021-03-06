import { Ingredient } from './enums';
import { INpmPackage } from './npm-package.interface';

export interface IDough {
    name: string;
    options: Ingredient;
    packages: INpmPackage[];
}
