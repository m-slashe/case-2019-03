const _cliProgress = require("cli-progress");

module.exports = async db => {
  let interactions = require("../dados/interacao_medicamentosa.json");
  let medicines = require("../dados/medicamentos.json");

  await importTable("Medicine", "medicines", medicines, async (added, item) => {
    for (let farmaco of item.Farmacos) {
      let [farmacoAdded] = await db.Farmaco.findOrCreate({
        where: {
          name: farmaco
        }
      });
      await added.addFarmaco(farmacoAdded);
    }
  });
  await importTable("Interaction", "interactions", interactions);

  async function importTable(table, tableDesc, jsonArray, insertCallback) {
    let count = await db[table].count();
    console.log(`${tableDesc} possui ${count} linhas`);
    console.log(`${tableDesc}.json possui ${jsonArray.length} linhas`);
    let left = jsonArray.slice(count);
    console.log(`Faltam ${left.length} itens serem importados!!!`);
    const needImport = count > jsonArray.length;
    if (needImport) {
      console.log(
        "Numero de itens no banco maior que array...deletando registros..."
      );
      await db[table].destroy({ truncate: true });
      console.log("Registros deletados!!!");
    }
    if (left.length !== 0 || needImport) {
      console.log(`Importando ${tableDesc}!!!`);
      const bar = new _cliProgress.SingleBar({}, _cliProgress.Presets.legacy);
      bar.start(left.length, 0);
      for (let [index, item] of left.entries()) {
        let addedItem = await db[table].create(item);
        if (insertCallback) {
          await insertCallback(addedItem, item);
        }
        bar.update(index);
      }
      bar.stop();
      console.log(`${tableDesc} importadas!!!`);
    }
    console.log(`${table} finalizado!!!`);
  }
};
