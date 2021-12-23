export class HeroViewModel {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _description: string;

  constructor(id: string, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = name;
  }
}
