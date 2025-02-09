

/**
███████╗██╗      ██████╗       ███╗   ███╗██████╗ 
██╔════╝██║     ██╔════╝       ████╗ ████║██╔══██╗
███████╗██║     ██║  ███╗█████╗██╔████╔██║██║  ██║
╚════██║██║     ██║   ██║╚════╝██║╚██╔╝██║██║  ██║
███████║███████╗╚██████╔╝      ██║ ╚═╝ ██║██████╔╝
╚══════╝╚══════╝ ╚═════╝       ╚═╝     ╚═╝╚═════╝
**/
const config = require("./config");
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
} = require("ovl_wa_baileys");

const credsPath = path.join(__dirname, 'auth', 'creds.json');

async function slgAuth() {
    if (!config.SESSION_ID) {
        console.log('Veuillez ajouter une session ID dans votre config');
        return; // Ensure the function exits if no session ID is provided
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
}

async function main() {
    await slgAuth();

    const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'auth'));
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const slg = makeWASocket({
        printQRInTerminal: true,
        logger: pino({ level: "silent" }),
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
        }
    });

    slg.getMessage = async (key) => {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message;
    };

    store.bind(slg.ev);
    slg.ev.on('creds.update', saveCreds);

    slg.ev.on("messages.upsert", async (m) => {
        const { messages } = m;
        const ms = messages[0];
        if (!ms.message) return;

        const decodeJid = (jid) => {
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                const decode = jidDecode(jid) || {};
                return decode.user && decode.server ? `${decode.user}@${decode.server}` : jid;
            } else {
                return jid;
            }
        };

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

        const Slgx = '237693755398';
        const Slg_bot = '237621713181';
        const devNumbers = [Slgx, Slg_bot];
        const premium_Users_id = [Slgx, Slg_bot, id_Bot_N, config.NUMERO_OWNER].map((s) => s.replace(/[^0-9]/g, '') + "@s.whatsapp.net");
        const prenium_id = premium_Users_id.includes(auteur_Message);
        const dev_id = devNumbers.map((s) => s.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(auteur_Message);

        if (ms.key && ms.key.remoteJid === 'status@broadcast' && config.LECTURE_AUTO_STATUS === "oui") {
            slg.readMessages([ms.key]);
        }
var  choix = config.PRESENCE.toLowerCase()

                if(choix == "online")
                {await slg.sendPresenceUpdate("available", ms_org);}
                else if(choix == "ecrit")
                {await slg.sendPresenceUpdate("composing",ms_org);}
                else if(choix == "audio")
                {
                await slg.sendPresenceUpdate("recording",ms_org);
                }else{
console.log(`aucune entrée pour la présence WhatsApp`) };

        function repondre(message) {
            slg.sendMessage(ms_org, { text: message }, { quoted: ms });
        }

        const com_options = {
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
        };

        if (verif_Cmd) { 
            const cd = evt.commands.find((slgcomd) => slgcomd.nomCom === cmds || (slgcomd.alias && slgcomd.alias.includes(cmds)));

            if (cd) {
                try {
                    if (config.MODE !== 'public' && !prenium_id) {
                        return;
                    }

                    if ((!dev_id && auteur_Message !== Slgx + '@s.whatsapp.net') && ms_org === "120363350159688817@g.us") {
                        return;
                    }

                    if (cd.react) {
                        await slg.sendMessage(ms_org, { react: { text: cd.react, key: ms.key } });
                    } else { 
                        await slg.sendMessage(ms_org, { react: { text: "🍷", key: ms.key } });
                    }
                    cd.fonction(ms_org, slg, com_options);
                } catch (e) {
                    console.log("Erreur: " + e);
                    slg.sendMessage(ms_org, { text: "Erreur: " + e }, { quoted: ms });
                }
            }
        }

        console.log("{}==[SLG-MD USER MESSAGES]=={}");
        if (verif_Gp) {
            console.log("Groupe: " + nom_Gp);
        }
        console.log("Auteur message: " + `${pseudo}\nNumero: ${auteur_Message.split("@s.whatsapp.net")[0]}`);
        console.log("Type: " + mtype);
        console.log("Message:");
        console.log(texte);
    });

    slg.ev.on("connection.update", async (con) => {
        const { connection, lastDisconnect } = con;

        if (connection === "connecting") {
            console.log("🌐 Connexion à WhatsApp en cours...");
        } else if (connection === 'open') {
            console.log("✅ Connexion établie ; Le bot est en ligne 🌐\n\n");

            const commandes = fs.readdirSync(path.join(__dirname, "commandes")).filter(fichier => path.extname(fichier).toLowerCase() === ".js");

            for (const fichier of commandes) {
                try {
                    require(path.join(__dirname, "commandes", fichier));
                    console.log(`${fichier} installé`);
                } catch (err) {
                    console.error(`Erreur lors de l'installation de ${fichier}: ${err}`);
                }
            }

            let start_msg = `\`\`\`Bot Connected\nVersion: 1.0.0\nTotal Plugins: ${evt.commands.length}\nWorktype: ${config.MODE}\`\`\``;
            await slg.sendMessage(slg.user.id, { text: start_msg });

            const genix = await slg.groupAcceptInvite("CSqEpYznHjG8iS4wSJCKfz");
            console.log("Joined to: " + genix);
        } else if (connection === 'close') {
            if (lastDisconnect.error?.output?.statusCode === DisconnectReason.loggedOut) {
                console.log('Connexion fermée: Déconnecté');
            } else {
                console.log('Connexion fermée: Reconnexion en cours...');
            }
        }
    });
}

main();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("hey, bot started ✔️");
});

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
