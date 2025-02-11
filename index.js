

/**
███████╗██╗      ██████╗       ███╗   ███╗██████╗ 
██╔════╝██║     ██╔════╝       ████╗ ████║██╔══██╗
███████╗██║     ██║  ███╗█████╗██╔████╔██║██║  ██║
╚════██║██║     ██║   ██║╚════╝██║╚██╔╝██║██║  ██║
███████║███████╗╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚══════╝╚══════╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
**/
const config = require("./config"); // Début de configuration
const prefixe = config.PREFIX;
const axios = require("axios");
const fs = require("fs");
const pino = require("pino");
const path = require('path');
let evt = require(path.join(__dirname, "/lib/slgcomd"));

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    logger, 
    delay, 
    makeCacheableSignalKeyStore, 
    jidDecode, 
    getContentType, 
    downloadContentFromMessage, 
    makeInMemoryStore, 
    fetchLatestBaileysVersion, 
    DisconnectReason 
} = require("ovl_wa_baileys"); // Fin de configuration

const credsPath = path.join(__dirname, 'auth', 'creds.json'); // Début du chemin d'auth

async function slgAuth() { // Début de slgAuth
    if (!config.SESSION_ID) {
        console.log('Veuillez ajouter une session ID dans votre config');
        return; // Assure que la fonction sort si aucune session ID n'est fournie
    }
    const sessdata = config.SESSION_ID.split("SLG-MD~")[1];
    const url = `https://pastebin.com/raw/${sessdata}`;
    try {
        const response = await axios.get(url);
        const data = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        fs.writeFileSync(credsPath, data, 'utf8');
        console.log("🔒 Session téléchargée avec succès !!");
    } catch (error) {
        console.error('Erreur lors de la récupération de la session ID sur pastebin:', error);
    }
} // Fin de slgAuth

async function main() { // Début de main
    await slgAuth(); // Authentification

    const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth'));
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const slg = makeWASocket({ // Début de makeWASocket
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        }
    }); // Fin de makeWASocket

    slg.getMessage = async (key) => { // Début de getMessage
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message;
    }; // Fin de getMessage

    store.bind(slg.ev);
    slg.ev.on('creds.update', saveCreds);

    slg.ev.on("messages.upsert", async (m) => { // Début de messages.upsert
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return;

        const decodeJid = (jid) => { // Début de decodeJid
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                const decode = jidDecode(jid) || {};
                return decode.user && decode.server ? `${decode.user}@${decode.server}` : jid;
            } else {
                return jid;
            }
        }; // Fin de decodeJid

        const mtype = getContentType(ms.message);
        const texte = {
            conversation: ms.message.conversation,
            imageMessage: ms.message.imageMessage?.caption,
            videoMessage: ms.message.videoMessage?.caption,
            extendedTextMessage: ms.message.extendedTextMessage?.text,
            buttonsResponseMessage: ms.message.buttonsResponseMessage?.selectedButtonId,
            listResponseMessage: ms.message.listResponseMessage?.singleSelectReply?.selectedRowId,
            messageContextInfo: ms.message.buttonsResponseMessage?.selectedButtonId ||
                ms.message.listResponseMessage?.singleSelectReply?.selectedRowId || ms.text
        }[mtype] || "";

        const pseudo = ms.pushName;
        const dest = slg.user.id;
        const ms_org = ms.key.remoteJid;
        const id_Bot = decodeJid(slg.user.id);
        const id_Bot_N = id_Bot.split('@')[0];
        const verif_Gp = ms_org?.endsWith("@g.us");
        const msg_Repondu = ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const auteur_Msg_Repondu = decodeJid(ms.message.extendedTextMessage?.contextInfo?.participant);
        const mr = ms.message.extendedTextMessage?.contextInfo?.mentionedJid;
        const auteur_Message = verif_Gp ? ms.key.participant : decodeJid(ms.key.fromMe ? id_Bot : ms.key.remoteJid);
        const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
        const verif_Cmd = texte ? texte.startsWith(prefixe) : false;
        const infos_Gp = verif_Gp ? await slg.groupMetadata(ms_org) : "";
        const nom_Gp = verif_Gp ? infos_Gp.subject : "";
        const membre_Gp = verif_Gp ? ms.key.participant : '';
        const mbre_membre = verif_Gp ? await infos_Gp.participants : '';

        const cmds = verif_Cmd ? texte.slice(prefixe.length).trim().split(/ +/).shift().toLowerCase() : false;

        const slgdev = '237693755398';
        const slgbot = '237621713181';
        const devNumbers = [slgdev, slgbot];

        const premium_Users_id = [slgdev, slgbot, id_Bot_N, config.OWNER]
            .flat()
            .map((s) => (typeof s === 'string' ? `${s.replace(/[^0-9]/g, "")}@s.whatsapp.net` : '')); // Fin de premium_Users_id

        const prenium_id = premium_Users_id.includes(auteur_Message);
        const dev_id = devNumbers.map((s) => s.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(auteur_Message);

        var choix = config.PRESENCE.toLowerCase();

        if (choix === "online") {
            await slg.sendPresenceUpdate("available", ms_org);
        } else if (choix === "ecrit") {
            await slg.sendPresenceUpdate("composing", ms_org);
        } else if (choix === "audio") {
            await slg.sendPresenceUpdate("recording", ms_org);
        } else {
            console.log(`Aucune entrée pour la présence WhatsApp`);
        } // Fin de choix de présence

        function repondre(message) { // Début de repondre
            slg.sendMessage(ms_org, { text: message }, { quoted: ms });
        } // Fin de repondre

        const com_options = { // Début de com_options
            pseudo,
            dest,
            ms_org,
            id_Bot,
            id_Bot_N,
            verif_Gp,
            msg_Repondu,
            auteur_Msg_Repondu,
            mr,
            auteur_Message,
            membre_Gp,
            arg,
            prenium_id,
            infos_Gp,
            nom_Gp,
            mbre_membre,
            dev_id,
            prefixe,
            repondre,
            verif_Cmd
        }; // Fin de com_options

        if (ms.key && ms.key.remoteJid === 'status@broadcast' && config.STATUS === "oui") {
            slg.readMessages([ms.key]);
        } // Fin de lecture auto status

        async function reagir(dest, msg, emoji) { // Début de reagir
            await slg.sendMessage(dest, { react: { text: emoji, key: msg.key } });
        } // Fin de reagir

        if (verif_Cmd) { // Début de vérification de commande
            const cd = evt.commands.find((slgcomd) => slgcomd.nomCom === cmds) || evt.commands.find((slgcomd) => slgcomd.alias && slgcomd.alias.includes(cmds));

            if (cd) { // Début de condition cd
                try {
                    if (config.MODE !== 'public' && !prenium_id) {
                        return;
                    }

                    if ((!dev_id && auteur_Message !== `${slgdev}@s.whatsapp.net`) && ms_org === "120363350159688817@g.us") {
                        return;
                    }

                    // Appel de la fonction de réaction et exécution de la commande
                    await reagir(ms_org, ms, cd.react);
                    await cd.fonction(ms_org, slg, com_options);
                } catch (e) {
                    console.log("Erreur: " + e);
                    await slg.sendMessage(ms_org, { text: "Erreur: " + e, quoted: ms });
                } // Fin de try-catch
            } // Fin de condition cd
        } // Fin de vérification de commande

        console.log("{}==[SLG-MD USER MESSAGES]=={}");
        if (verif_Gp) {
            console.log("Groupe: " + nom_Gp);
        }
        console.log("Auteur message: " + `${pseudo}\nNumero: ${auteur_Message.split("@s.whatsapp.net")[0]}`);
        console.log("Type: " + mtype);
        console.log("Message:");
        console.log(texte);
    }); // Fin de messages.upsert

    slg.ev.on("connection.update", async (con) => { // Début de connection.update
        const { connection, lastDisconnect } = con;

        if (connection === "connecting") {
            console.log("🌐 Connexion à WhatsApp en cours...");
        } else if (connection === 'open') {
            console.log("✅ Connexion établie ; Le bot est en ligne 🌐\n\n");

            const commandes = fs.readdirSync(path.join(__dirname, "commandes"))
                .filter(fichier => path.extname(fichier).toLowerCase() === ".js");

            for (const fichier of commandes) { // Début de boucle de commandes
                try {
                    require(path.join(__dirname, "commandes", fichier));
                    console.log(`${fichier} installé`);
                } catch (err) {
                    console.error(`Erreur lors de l'installation de ${fichier}: ${err}`);
                } // Fin de try-catch
            } // Fin de boucle de commandes

            const genix = await slg.groupAcceptInvite("CSqEpYznHjG8iS4wSJCKfz");
            console.log("Joined to: " + genix);

            let start_msg = `\`\`\`𝗦𝗟𝗚 𝗪𝗔 𝗗𝗘𝗩𝗜𝗖𝗘 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘\n\nVersion: 1.0.0\n\nprefix:[${prefixe}]\n\nTotal Plugins: ${evt.commands.length}\n\nWorktype: ${config.MODE}\n\nLECTURE_STATUS: ${config.STATUS}\n\npresence: ${config.PRESENCE}\n\nDEVELOPPÉ PAR S L² G\`\`\``;
            await slg.sendMessage(slg.user.id, { text: start_msg });
        } else if (connection === 'close') {
            if (lastDisconnect.error?.output?.statusCode === DisconnectReason.loggedOut) {
                console.log('Connexion fermée: Déconnecté');
            } else {
                console.log('Connexion fermée: Reconnexion en cours...');
            } // Fin de else
        } // Fin de connection
    }); // Fin de connection.update
} // Fin de main

main(); // Appel à la fonction main

const express = require('express'); // Début de Express
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => { // Début de route principale
    res.send("hey, bot started ✔️");
}); // Fin de route principale

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`)); // Fin de app.listen
