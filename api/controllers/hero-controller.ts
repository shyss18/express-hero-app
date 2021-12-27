import * as express from "express";
import { Guid } from "guid-typescript";
import HeroModel from "../models/hero";
import { HeroViewModel } from "../viewModels/hero";

export const create = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const viewModel: HeroViewModel = request.body;
  const heroModel = new HeroModel({
    id: viewModel.name + Guid.create(),
    name: viewModel.name,
    description: viewModel.description,
  });

  heroModel
    .save()
    .then((result) =>
      response.status(200).json({
        message: `Hero with id:=${result.id} has been succefully created`,
      }),
    )
    .catch((reason) =>
      response.status(500).json({
        error: reason,
      }),
    );
};

export const edit = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const id: string = request.params.id;
  HeroModel.findOneAndUpdate(
    { id: id },
    {
      $set: new HeroModel({
        id: request.body.id,
        name: request.body.name,
        description: request.body.description,
      }),
    },
    { $new: true },
  )
    .exec()
    .then((result) =>
      response.status(200).json({
        message: `Hero with id:=${result.id} has been succefully updated`,
      }),
    )
    .catch((reason) => reason.status(500).json({ error: reason }));
};

export const deleteOne = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const id: string = request.params.id;
  HeroModel.findOneAndDelete({ id: id })
    .exec()
    .then((result) =>
      response.status(200).json({
        message: `Hero with id:=${result.id} has been succefully deleted`,
      }),
    )
    .catch((reason) => response.status(500).json({ error: reason }));
};

export const getAll = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  HeroModel.find()
    .exec()
    .then((result) =>
      response
        .status(200)
        .json(
          result.map(
            (hero) => new HeroViewModel(hero.id, hero.name, hero.description),
          ),
        ),
    )
    .catch((reason) => response.status(500).json({ error: reason }));
};

export const getOne = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const id: string = request.params.id;
  HeroModel.findOne({ id: id })
    .exec()
    .then((result) =>
      response
        .status(200)
        .json(new HeroViewModel(result.id, result.name, result.description)),
    )
    .catch((reason) =>
      response.status(500).json({
        error: reason,
      }),
    );
};
