import React from "react";
import {
  DocNodeVariable,
  TsTypeDefKind,
  TsTypeDefTypeLiteral,
} from "../util/docs";
import { SimpleCard, SimpleSubCard } from "./SinglePage";

export function VariableCard({ node }: { node: DocNodeVariable }) {
  const type = node.variableDef.tsType;
  const isNamespace =
    node.variableDef.kind === "const" &&
    type &&
    type.kind === TsTypeDefKind.TypeLiteral &&
    type.typeLiteral.properties.length > 0 &&
    type.typeLiteral.methods.length === 0 &&
    type.typeLiteral.callSignatures.length === 0;

  return isNamespace ? (
    <VariableNamespaceCard node={node} />
  ) : (
    <SimpleCard node={node} prefix={node.variableDef.kind} returnType={type} />
  );
}

export function VariableNamespaceCard({ node }: { node: DocNodeVariable }) {
  const type = node.variableDef.tsType as TsTypeDefTypeLiteral;
  return (
    <SimpleCard
      node={node}
      prefix={node.variableDef.kind}
      details={
        <div className="mt-2">
          <p className="text-md font-medium">Properties</p>
          {type.typeLiteral.properties.map((node) => {
            return (
              <SimpleSubCard
                node={{ name: node.name }}
                returnType={node.tsType}
              />
            );
          })}
        </div>
      }
    />
  );
}