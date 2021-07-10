import { createContext, useState } from "react";
import {
  BankResponse,
  Destinatary,
  Movement,
  Bank,
  MovementResponse,
} from "../interfaces/bankInterfaces";

import bankApi from "../api/bankApi";
import {
  DestinataryResponse,
  MovementRequest,
} from "../interfaces/bankInterfaces";

type BankContextProps = {
  loading: Boolean;
  // banks
  banks: Bank[];
  accountTypes: string[];
  loadBanks: () => void;
  // destinataries
  destinataries: Destinatary[];
  loadDestinataries: () => void;
  addDestinatary: (data: Destinatary) => Promise<any>;
  loadDestinataryById: (id: string) => Promise<DestinataryResponse>;
  // movements
  movements: Movement[];
  addMovement: (data: MovementRequest) => Promise<any>;
  loadMovements: () => void;
};

/**
 * bancos
 * destinatarios
 * transsaccciones
 */

export const BankContext = createContext({} as BankContextProps);

export const BankProvider = ({ children }: any) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [accountTypes, setAccountTpes] = useState<string[]>([]);

  const [destinataries, setDestinataries] = useState<Destinatary[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  const loadBanks = async () => {
    setLoading(true);
    try {
      const { data } = await bankApi.get<BankResponse>("/bank");
      setBanks(data.banks);
      setAccountTpes(data.accountTypes);
      setTimeout(() => setLoading(false), 200);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDestinataries = async () => {
    setLoading(true);
    try {
      const { data } = await bankApi.get<DestinataryResponse>("/destinatary");
      setDestinataries(data.destinataries);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDestinataryById = async (destinataryId: string) => {
    const { data } = await bankApi.get<DestinataryResponse>(
      `/destinatary?id=${destinataryId}`
    );
    return data;
  };

  const addDestinatary = async (destinatary: any) => {
    setLoading(true);
    try {
      const { data } = await bankApi.post<Destinatary>(
        "/destinatary",
        destinatary
      );
      setDestinataries([...destinataries, data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addMovement = async (movement: MovementRequest) => {
    setLoading(true);
    try {
      const { data } = await bankApi.post<Movement>("/movement", movement);
      setMovements([...movements, data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMovements = async () => {
    setLoading(true);
    const { data } = await bankApi.get<MovementResponse>("/movement");
    setMovements(data.movements);
    setLoading(false);
  };

  return (
    <BankContext.Provider
      value={{
        loading,
        banks,
        accountTypes,
        loadBanks,
        destinataries,
        loadDestinataries,
        loadDestinataryById,
        addDestinatary,
        movements,
        addMovement,
        loadMovements,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};
