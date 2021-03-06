import * as express from "express";
import { Guid } from "guid-typescript";
import VillainModel from "../models/villain";
import { VillainViewModel } from "../viewModels/villain";

export const create = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const viewModel: VillainViewModel = request.body;
  const villainModel = new VillainModel({
    id: viewModel.name + Guid.create(),
    name: viewModel.name,
    description: viewModel.description,
  });

  villainModel
    .save()
    .then((result) =>
      response.status(200).json({
        message: `Villain with id:=${result.id} has been succefully created`,
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
  VillainModel.findOneAndUpdate(
    { id: id },
    {
      $set: {
        name: request.body.name,
        description: request.body.description,
      },
    },
    { $new: true },
  )
    .exec()
    .then((result) =>
      response.status(200).json({
        message: `Villain with id:=${result.id} has been succefully updated`,
      }),
    )
    .catch((reason) => response.status(500).json({ error: reason }));
};

export const deleteOne = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  const id: string = request.params.id;
  VillainModel.findOneAndDelete({ id: id })
    .exec()
    .then((result) =>
      response.status(200).json({
        message: `Villain with id:=${result.id} has been succefully deleted`,
      }),
    )
    .catch((reason) => response.status(500).json({ error: reason }));
};

export const getAll = (
  request: express.Request,
  response: express.Response,
  next,
) => {
  VillainModel.find()
    .exec()
    .then((result) =>
      response
        .status(200)
        .json(
          result.map(
            (villain) =>
              new VillainViewModel(
                villain.id,
                villain.name,
                villain.description,
              ),
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
  VillainModel.findOne({ id: id })
    .exec()
    .then((result) =>
      response
        .status(200)
        .json(new VillainViewModel(result.id, result.name, result.description)),
    )
    .catch((reason) =>
      response.status(500).json({
        error: reason,
      }),
    );
};
